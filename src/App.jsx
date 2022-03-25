import React,{useState,useCallback,useEffect} from 'react'
import client from './client'
import Loading from './components/Loading'
import Home from './Home'

const App = () => {
  const [slide, setSlide] = useState([])
    const [isSliderLoading, setSliderLoading] = useState(false)
    const getSlideData = useCallback(async () => {
        setSliderLoading(true)
        try {
            const response = await client.getEntries({ content_type: 'furnitureSlider' })
            const resposneData = response.items
            if (resposneData) {
                cleanupSlide(resposneData)
            } else {
                setSlide([])
            }
            setSliderLoading(false)
        } catch (error) {
            console.log(error);
            setSliderLoading(false)
        }
    }, [])
    // cleanup funtion 
    const cleanupSlide = useCallback(
        (rawData) => {
            const cleanSlide = rawData.map((slide) => {
                const { sys, fields } = slide
                const { id } = sys
                const sliderTitle = fields.sliderTitle
                const sliderSubtitle = fields.sliderSubtitle
                const price = fields.sliderPrice
                const slideImage = fields.sliderImage.fields.file.url
                const updateSlide = { id, sliderTitle, sliderSubtitle, price, slideImage }
                return updateSlide;
                // console.log(cleanSlide);
            })
            setSlide(cleanSlide)
          
        }, []
    )



    useEffect(() => {

        getSlideData()
        // cleanupSlide()
    }, [getSlideData])

    if (isSliderLoading) {
      return(

       <Loading/>
        )
    }
  return (
    <>
    <Home slide={slide}/>
  
    </>
  )
}

export default App
