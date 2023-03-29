import { useRouter } from "next/router";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

const ROUTE_POST_ID = "watch/[seriesid]";

const CollectionCard = (props: {
  id: string | undefined;
  img1: string | undefined;
  img2: string | undefined;
  title: string;
  release_date: string | number;
  rating: string | number;
  description: string;
}) => {
  const router = useRouter();
  function showDetails() {
    router.push("/watch/" + props.id);
  }

  return (
    <Link
      href={{
        pathname: ROUTE_POST_ID,
        query: { seriesid: props.id },
      }}
    >
      <div className="cards w-[150px] h-[280px] md:w-[200px] mr-1 md:mr-3 mb-3 md:h-[300px] group">
        <img
          className="cards__img z-[1] group-hover:hidden"
          src={props.img1}
          loading="lazy"
        />
        <img className="cards__img z-[2]" src={props.img2} loading="lazy" />
        <div className="cards__overlay p-3">
          <div className="card__title mb-0 px-0 text-[red]">{props.title}</div>
          <div className="card__runtime">
            {props.release_date}
            <div className="flex justify-end align-centre">
              <span className="card__rating  flex justify-center items-center">
                {props.rating}
                <FaStar className="text-[yellow] text-[13px]" />
              </span>
            </div>
          </div>
          <div className="card__description">
            {props.description ? props.description.slice(0, 100) + "..." : ""}
          </div>
          {/* <div>
          <button onClick={showDetails} className="rounded-2xl bg-slate-50">
            click me
          </button>
          <button>
            <Link
              href={{
                pathname: ROUTE_POST_ID,
                query: { seriesid: props.id },
              }}>
              click
            </Link>
          </button>
        </div> */}
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
