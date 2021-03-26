

import React, { createRef, useEffect } from 'react'
import { useScreenshot } from 'use-react-screenshot'
 
function ScreenShotRender(props){
	const ref = createRef(null)
	const [image, takeScreenshot] = useScreenshot()
    const getImage = () => takeScreenshot(ref.current)

    useEffect(() => {
            getImage()
        });

	return (
	  <div>
		<img width="100%" src={image} alt={'Screenshot'} />
        <div style={{display: "none"}}>
            <div ref={ref}>
                {props.children}
            </div>
        </div>
	  </div>
	)
  }

export default ScreenShotRender;
