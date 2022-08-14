import { IconButton, ImageList, ImageListItem, ImageListItemBar } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { FaRegComment } from "react-icons/fa"
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return width


}


const PreviewPost = ({ currentUserPosts }) => {
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
                        <ImageListItem sx={{
                            "&:hover": {
                                opacity: '0.7'
                            }
                        }}
                            key={item._id} cols={cols} rows={rows}>
                            <img
                                src={item.selectedFile}
                                alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                sx={{
                                    background:
                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                }}
                                title={item.title}
                                position="top"
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'white' }}
                                        aria-label={`star ${item.title}`}
                                    >
                                        <FaRegComment />

                                    </IconButton>
                                }
                                actionPosition="left"
                            />
                        </ImageListItem>
                    );
                })}
            </ImageList>

        </>
    )
}



export default PreviewPost