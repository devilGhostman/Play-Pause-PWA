import { FaStar } from "react-icons/fa";

const SimilarCateCard = (props: {
  id: string | undefined;
  img1: string | undefined;
  img2: string | undefined;
  title: string;
  release_date: string | number;
  rating: string | number;
  description: string;
}) => {
  return (
    <div className="card group h-[280px] sm:h-[300px]">
      <a href={`/watch/${props.id}`}>
        <img
          className="cards__img z-[1] group-hover:hidden"
          src={props.img1}
          loading="lazy"
        />
        <img className="cards__img z-[2]" src={props.img2} loading="lazy" />

        <div className="cards__overlay p-3">
          <div className="card__title mb-0 px-0 text-[red] z-[15]">
            {props.title}
          </div>
          <div className="card__runtime text-[white] z-[15]">
            {props.release_date}
            <span className="card__rating flex justify-center items-center z-[15]">
              {props.rating}
              <FaStar className="text-[yellow] text-[13px] " />
            </span>
          </div>
          <div className="card__description text-[white] z-[15]">
            {props.description ? props.description.slice(0, 118) + "..." : ""}
          </div>
        </div>
      </a>
    </div>
  );
};

export default SimilarCateCard;
