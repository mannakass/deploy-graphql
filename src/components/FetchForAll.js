import ProfileInfo from './ProfileInfo.js'
import TaskGraph from './TaskGraph.js';
import LineGraph from './LineGraph.js';
import { useGQLQuery } from '../Hooks/useGQLQurery'
import { GET_USER, GET_FINISHED_PROJECTS, GET_DATE_AND_XP, GET_LEVEL } from '../other/queries';
import { removeAudits, increasingXP } from '../other/processData.js';

export function FetchForAll() {


    const userProfile = useGQLQuery('user', GET_USER);
    const tasks = useGQLQuery('task', GET_FINISHED_PROJECTS);
    const projectsData = useGQLQuery('xp', GET_DATE_AND_XP);
    const levels = useGQLQuery('level', GET_LEVEL);

    if (userProfile.isLoading || tasks.isLoading || projectsData.isLoading || levels.isLoading) return "Loading...";
    // if (userProfile.error) return "An error has occurred: " + error.message;

    let correctPaths = [];
    let middleman = [];

    /* find all the correct paths */
    tasks.data.user[0].progresses.map(path => {
        let proovime = path.path
        correctPaths.push(proovime)

        return correctPaths
    })

    /* find all the possible paths */
    const possiblePaths = projectsData.data.user[0].transactions.map(project => {
        if (project.object.type === 'module') {
            middleman.push(project)
        }
        return JSON.parse(JSON.stringify(project.path))
    })

    let filterAudits = removeAudits(correctPaths, possiblePaths, middleman, projectsData);
    let increaseXP = increasingXP(filterAudits)

    return (
        <div>
            <ProfileInfo
                filterAudits={filterAudits}
                userProfile={userProfile}
                levels={levels}
            />
            <LineGraph
                increaseXP={increaseXP}
                filterAudits={filterAudits}
            />
            <TaskGraph
                filterAudits={filterAudits}
            />

        </div>
    )
}