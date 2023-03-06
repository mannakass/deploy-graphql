import { gql } from 'graphql-request'

/* here I get login=mannakass and id=82 */
export const GET_USER = gql`
    query {
        user(where: { id: { _eq: 82 }}) {
        id
        login
        }
}
`

/* here i get :
    isDone=true
    all the projects I've finished (including go piscine and all optional tasks)
    path to each projects (which is the same as in GETDATEANDXP) 
*/
export const GET_FINISHED_PROJECTS = gql`
    query {
        user(where: {login: {_eq: "mannakass"}}) {
            progresses(
              limit: 50
              where: {isDone: {_eq: true}, _or: [{object: {type: {_eq: "project"}}}, {object: {type: {_eq: "piscine"}}}]}
            ) {
              isDone
              path
              object {
                name
              }
            }
        }
}`

/* here i get: 
    xp for each task
    path of the task (which is the same as query GETFINISHEDPROJECTS)

    type piscine (excluding go piscine)
    type exercise (rust piscine tasks and exams (not sure if all of them since limit is 50))
    type module (250k xp for mentoring)

    date when i recieved the xp (createdAt)

    name of the task
*/
export const GET_DATE_AND_XP = gql`
    query {
      user(where: {login: {_eq: "mannakass"}}) {
        transactions(
          limit: 50
          order_by: {amount: asc_nulls_first}
          where: {type: {_eq: "xp"}, object: {type: {_nregex: "exercise|raid"}}}
        ) {
          amount
          path
          createdAt
          object {
            name
            type
          }
        }
      }
    }
`

/* here i get current level */
export const GET_LEVEL = gql`
    query {
        transaction(
        where: {userId: {_eq: 82}, type: {_eq: "level"}, object: {type: {_nregex: "exercise|raid"}}}
        limit: 1
        offset: 0
        order_by: {amount: desc}
    )
    {
        amount
    }
    }
`
