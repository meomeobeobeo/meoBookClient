import {ImageList} from "@mui/material"
import {useEffect, useRef, useState} from "react"
import CurrentUserImageItem from "./CurrentUserImageItem";

function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return width


}


const PreviewPost = ({currentUserPosts}) => {
    const componentRef = useRef(null)

    const [currentWidth, setCurrentWidth] = useState(getWindowDimensions() * 9 / 12)


    useEffect(() => {
        const handleResize = () => {
            setCurrentWidth(componentRef?.current?.offsetWidth)
        }
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }


    }, [componentRef])
    return (
        <>
            <ImageList
                sx={{
                    width: '100%',

                    // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                    transform: 'translateZ(0)',
                    alignContent: 'flex-start'
                }}
                rowHeight={currentWidth / 3}
                cols={3}
                gap={25}
                ref={componentRef}

            >
                {currentUserPosts.map((item) => {
                    const cols = 1;
                    const rows = 1;

                    return (
                        <CurrentUserImageItem key={item._id} item={item} cols={cols} rows={rows}/>
                    );
                })}
            </ImageList>

        </>
    )
}


export default PreviewPost