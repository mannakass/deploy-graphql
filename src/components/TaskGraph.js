import { React, useRef, useEffect } from 'react'
import * as d3 from 'd3'

function TaskGraph({ filterAudits }) {

    const svg2Ref = useRef();
    let taskRef = useRef()
    taskRef.current = filterAudits.sort((a, b) => (a.amount) - (b.amount))

    useEffect(() => {
        const width = 1000;
        const height = 600;
        const margin = { top: 50, bottom: 50, left: 50, right: 50 }
        const Y = d3.map(taskRef.current, d => d.amount);
        const X = d3.map(taskRef.current, d => d.object.name)

        const svg = d3.select(svg2Ref.current)
            .attr('height', height - margin.top - margin.bottom)
            .attr('width', width - margin.left - margin.right)
            .attr('viewBox', [0, 0, width, height])


        const xScale = d3.scaleBand()
            .domain(d3.range(taskRef.current.length))
            .range([margin.left, width - margin.right])
            .padding(0.1)


        const yScale = d3.scaleLinear()
            .domain([0, d3.max(Y)])
            .range([height - margin.bottom, margin.top])

        svg
            .append('g')
            .attr('fill', '#A7727D')
            .selectAll('rect')
            .data(Y)
            .join('rect')
            .attr('x', (d, i) => xScale(i))
            .attr('y', (d) => yScale(d))
            .attr('height', (d) => yScale(0) - yScale(d))
            .attr('width', xScale.bandwidth())

        function yAxis(g) {
            g.attr('transform', `translate(${margin.left}, 0)`)
            g.call(d3.axisLeft(yScale))
        }

        function xAxis(g) {
            g.attr('transform', `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(xScale).tickFormat(i => X[i]))
        }

        svg.append('g').call(yAxis)
        svg.append('g').call(xAxis)
        svg.node()
    }, taskRef.current)

    return (
        <div className='task-graph'>
            <p className='task-graph-title'>XP by task</p>
            <p className='task-graph-subcomment'>*Div 01 represents the XP of being a mentor for second batch</p>
            <svg ref={svg2Ref}></svg>
        </div>
    )
}
export default TaskGraph
