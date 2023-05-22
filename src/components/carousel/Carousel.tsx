import React, {useRef} from "react";
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill,} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import LazyImg from "../lazyLoadImage/lazy-img.tsx";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import {RootState} from "../../store/store";
import {IMovies} from "../../typescript/Results";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

interface CarouselProps {
    data: IMovies[] | undefined;
    loading: boolean | string | null;
    endpoint: string | undefined;
    title?: string;
}

const Carousel: React.FC<CarouselProps> = ({data, loading, endpoint, title}) => {
    const carouselContainer = useRef<HTMLDivElement>(null);
    const {url} = useSelector((state: RootState) => state.home);
    const navigate = useNavigate();

    const navigation = (dir: "left" | "right") => {
        // Implementation for navigating carousel
        const container = carouselContainer.current;

        if (!container) return;

        const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        })
    };

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />

                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item: IMovies) => {
                            const posterUrl = item.poster_path
                                ? url.poster + item.poster_path
                                : PosterFallback;
                            return (
                                <div className="carouselItem" key={item.id}
                                     onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                                    <div className="posterBlock">
                                        <LazyImg src={posterUrl}/>
                                        <CircleRating
                                            rating={item.vote_average ? Number(item?.vote_average?.toFixed(1)) : 0}
                                        />
                                        {<Genres data={item.genre_ids ? item.genre_ids.slice(0, 2) : null}/>}
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">{item.title || item.name}</span>

                                        <span className="date">
                      {dayjs(item.release_date).format("MMM D, YYYY")}
                    </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Carousel;