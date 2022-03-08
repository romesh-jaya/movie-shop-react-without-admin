import { useEffect, useRef, useState, ReactElement } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";

import { MovieLibrary } from "../../types/MovieLibrary";
import TitlePreview from "../TitlePreview";
import { thumbnailWidth } from "../../constants/appConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowWidth } from "@react-hook/window-size";

const thumbnailGap = 20;
const slideWidth = thumbnailWidth + thumbnailGap;

const arrowBtnStyles =
  "flex absolute w-8 h-8 md:w-12 md:h-12 top-36 md:top-32 translate-y-1/2 color-white hover-hover:hover:text-black active:text-black text-2xl bg-black hover-hover:hover:bg-white active:bg-white rounded-full items-center justify-center border-2 border-solid border-gray-300 cursor-pointer";

interface IProps {
  sectionTitle: string;
  titles: MovieLibrary[];
}

export default function TitleCarousel(props: IProps) {
  const { sectionTitle, titles } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const visibleSlidesAtATime = Math.floor(containerWidth / slideWidth);
  // note: I had to use Window width instead of parent container's width as the parent wouldn't shrink back when
  // shrinking the window
  const width = useWindowWidth();

  useEffect(() => {
    setContainerWidth(width);
  }, [width]);

  const renderSlides = () => {
    const slides: ReactElement[] = [];
    titles.forEach((movie, idx) => {
      slides.push(
        <Slide index={idx} key={movie.imdbID} class="!px-1 !py-0">
          <TitlePreview
            title={movie.title}
            year={movie.year}
            type={movie.type}
            imdbID={movie.imdbID}
          />
        </Slide>
      );
    });
    return slides;
  };

  // Note: naturalSlideWidth and naturalSlideHeight are ignored when isIntrinsicHeight is set
  return visibleSlidesAtATime > 0 ? (
    <div class="w-full relative" ref={containerRef}>
      <div class="w-full text-base font-bold mb-4">{sectionTitle}</div>
      <CarouselProvider
        naturalSlideWidth={3}
        naturalSlideHeight={3}
        totalSlides={titles.length}
        visibleSlides={visibleSlidesAtATime}
        step={visibleSlidesAtATime}
        isIntrinsicHeight
      >
        <Slider style={{ width: `${width}px` }}>{renderSlides()}</Slider>
        <ButtonBack class={arrowBtnStyles + " left-0"}>
          <FontAwesomeIcon icon="angle-left" />
        </ButtonBack>
        <ButtonNext class={arrowBtnStyles + " right-0"}>
          <FontAwesomeIcon icon="angle-right" />
        </ButtonNext>
      </CarouselProvider>
    </div>
  ) : null;
}
