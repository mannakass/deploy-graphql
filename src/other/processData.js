export function removeAudits(correct, possible, middleman, projectsData) {
    let result = [];
    let names = [];
    let k = 0;

    for (let i = 0; i < correct.length; i++) {
        for (let j = 0; j < possible.length; j++) {
            if (correct[i] === possible[j]) {
                middleman.push(projectsData.data.user[0].transactions[j])
            }
        }
    }

    middleman.sort();
    middleman.reverse();
    for (let i = 0; i < middleman.length; i++) {
        let taskName1 = middleman[i].object.name;

        while (k < middleman.length) {
            let taskName2 = middleman[k].object.name

            if (taskName1 === taskName2) {
                if (middleman[i].amount > middleman[k].amount) {

                    if (!names.includes(taskName1)) {
                        names.push(taskName1)
                        result.push(middleman[i])
                    }
                } else if (middleman[i].amount === middleman[k].amount) {

                    if (!names.includes(taskName1)) {
                        names.push(taskName1)
                        result.push(middleman[i])
                    }
                }
            }
            k++
        }
        k = 0;
    }

    return result
}


export function increasingXP(filterAudits) {
    let xp = 0;
    let date;

    filterAudits = filterAudits.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    let result = filterAudits.map(element => {

        xp += element.amount
        date = Date.parse(new Date(element.createdAt))
        element = { ...element, amount: xp, createdAt: date }
        return element
    })

    return result
}