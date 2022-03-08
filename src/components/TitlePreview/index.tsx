import { MovieType } from "../../enums/MovieType";
import { portraitImage } from "../../constants/appConstants";

interface IProps {
  title: string;
  year: string;
  type: MovieType.Movie | MovieType.TvSeries;
  mediaURL?: string;
  imdbID: string;
}

export default function TitlePreview(props: IProps) {
  const { title, year, type, mediaURL } = props;

  /*
  const onPosterClicked = () => {
    const id = imdbID + "-" + prettyUrl(title);
    router.push(
      {
        pathname: "/titles/[id]",
        query: { id },
      },
      `/titles/${id}`,
      { shallow: true }
    );
  };
  */

  return (
    <div class="w-48 m-auto shrink-0">
      <div class="shrink-0 cursor-pointer">
        <img
          src={mediaURL ?? portraitImage}
          alt={title}
          width={194}
          height={287}
          class="w-32 h-48 md:w-48 md:h-72"
        />
      </div>
      <div class="text-sm">
        <p class="mb-2 mt-1 whitespace-nowrap text-ellipsis overflow-hidden">
          {title}
        </p>
        <div class="flex">
          <div class="flex-1">{year}</div>
          <div class="rounded-sm border-2 border-solid border-white px-1">
            {type === MovieType.Movie ? "mov" : "tv"}
          </div>
        </div>
      </div>
    </div>
  );
}
