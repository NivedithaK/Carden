import React, { createRef, useEffect, useState } from 'react';
import { useScreenshot } from 'use-react-screenshot';

const simplePromise = new Promise(() => {
    setTimeout(() => {}, 100);
});

function ScreenShotRender(props) {
    const ref = createRef(null);
    const [image, takeScreenshot] = useScreenshot();
    const getImage = () => takeScreenshot(ref.current);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            getImage();
        }
        if (image) {
            setLoaded(true);
        }
    }, [loaded, getImage, image]);

    return (
        <div>
            {loaded ? (
                <img
                    width='100%'
                    height='100%'
                    src={image}
                    alt={'Screenshot'}
                />
            ) : (
                <div>
                    <div ref={ref}>{props.children}</div>
                </div>
            )}
        </div>
    );
}

export default ScreenShotRender;
