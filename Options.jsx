import React, { useState, useEffect } from 'react'
import ReactAnimateHeight from 'react-animate-height'

import BoolToggle from './BoolToggle'

const SketchOptions = props => {
    const { title, description, repo, options, increments, descriptions, onChange } = props
    // apply boolean: if true, add a button to manually apply the new options
    // Sketches that require it will handle the onclick logic themselves
    const [closed, setClosed] = useState(false)
    const [openDescriptions, setOpenDescriptions] = useState(new Set())

    useEffect(() => {
        console.log(openDescriptions)
    })

    function handleDescription(name) {
        let newDesc = new Set(JSON.parse(JSON.stringify(Array.from(openDescriptions))))
        if (openDescriptions.has(name)) {
            newDesc.delete(name)
        } else {
            newDesc.add(name)
        }
        setOpenDescriptions(newDesc)
    }

    return (<>
        <div id='sketch-options' className={`${closed && 'closed'}`}>
            
            <h1 id='sketch-title'>{title}</h1>
            <p className='sketch-description'>{description}</p>

            <div>
                {Object.keys(options).map(name => {
                    const val = options[name]
                    const descOpen = openDescriptions.has(name)

                    if (typeof val === 'boolean') {
                        return <div className='option' key={`bool-option-${name}`}>
                            <p><img className={descOpen && 'open'} onClick={() => handleDescription(name)} src={require('./down-arrow.png')} /> {name}</p>
                            <BoolToggle toggle={() => onChange(name, !val)} on={!!val} />
                            <ReactAnimateHeight height={descOpen ? 'auto' : 0}>
                                {descriptions[name]}
                            </ReactAnimateHeight>
                        </div>
                    }
                    
                    // number entry
                    return <>
                        <div key={`number-option-${name}`} className='option number-option'>
                            <p><img className={descOpen && 'open'} onClick={() => handleDescription(name)} src={require('./down-arrow.png')} /> {name}</p>
                            <input onChange={e => onChange(name, e.target.value)} value={val} />
                        </div>
                        <ReactAnimateHeight className={'description-area'} key={name} height={descOpen ? 'auto' : 0}>
                            <p>{descriptions[name]}</p>
                        </ReactAnimateHeight>
                    </>
                })}
                <div id='sketch-buttons'>
                    <button id='apply-sketch-options'>apply</button>
                    <button id='close-sketch-options' onClick={() => setClosed(true)}>close</button>
                </div>

                <h3 className='to-repo'>View the GitHub repo <a href={repo}>here</a>.</h3>
            </div>

            {/* <img
                src={require('./options.png')}
                className={`show-sketch-options ${!closed && 'closed'}`}
                onClick={() => setClosed(false)}
            /> */}
        </div>
        <img
            src={require('./options.png')}
            className={`show-sketch-options ${!closed && 'closed'}`}
            onClick={() => setClosed(false)}
        />
    </>)
}

export default SketchOptions