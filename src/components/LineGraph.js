import { React, useRef, useEffect } from 'react';
import * as d3 from 'd3'

function XPGraph({ increaseXP, filterAudits }) {

    let totalXP = 0;
    filterAudits.map(project => totalXP += project.amount)

    let XPRef = useRef()
    XPRef.current = increaseXP;

    const svgRef = useRef()
    useEffect(() => {
        // setting up svg
        const width = 1000;
        const height = 600;
        const margin = { top: 50, bottom: 50, left: 50, right: 50 }
        const Y = d3.map(XPRef.current, d => d.amount);
        const X = d3.map(XPRef.current, d => d.createdAt)

        const svg = d3.select(svgRef.current)
            .attr('height', height - margin.top - margin.bottom)
            .attr('width', width - margin.left - margin.right)
            .attr('viewBox', [0, 0, width, height])

        const xScale = d3.scaleUtc()
            .domain(d3.extent(X))
            .range([margin.left, width - margin.right])

        const yScale = d3.scaleLinear()
            .domain([0, totalXP])
            .range([height - margin.bottom, margin.top])

        const scaleLine = d3.line()
            .x((d, i) => xScale(X[i]))
            .y(yScale)
            .curve(d3.curveLinear)

        svg
            .selectAll('.line')
            .data([Y])
            .join('path')
            .attr('d', d => scaleLine(d))
            .attr('fill', 'none')
            .attr('stroke', '#A7727D')

        function yAxis(g) {
            g.attr('transform', `translate(${margin.left}, 0)`)
            g.call(d3.axisLeft(yScale))
        }

        function xAxis(g) {
            g.attr('transform', `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0))
        }

        svg.append('g').call(yAxis)
        svg.append('g').call(xAxis)
    }, XPRef.current)


    return (
        <div className='line-graph'>
            <p className='line-graph-title'>XP progression over time</p>
            <svg ref={svgRef}></svg>
        </div>
    )
}

export default XPGraph
