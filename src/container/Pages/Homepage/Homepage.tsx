import React from "react";
import classes from "./Homepage.module.scss";
import MainPresentation from "../../MainPresentation/MainPresentation";
import { clients, mainText, photos } from "../../../data/homepage_data";
import ListSvg from "../../../component/UI/ListSvg/ListSvg";
import TextRender from "../../../component/TextRender/TextRender";
import usePage from "../../../hooks/Page/page";
import SimpleImageSlider from "../../Slider/SimpleImageSlider/SimpleImageSlider";

interface HomepageProps {}

const Homepage = ({}: HomepageProps) => {
  const { visibleSectionNumber, refs } = usePage(3);
  /* const firstSectionRef: React.MutableRefObject<HTMLElement | null> = useRef(
    null
  );

  useEffect(() => {
    if (firstSectionRef.current === null) throw new Error();
    console.log(
      "FIRST SECTION",
      (firstSectionRef.current as HTMLElement).getBoundingClientRect()
    );
  }); */

  console.log("RENDER Homepage", visibleSectionNumber);

  return (
    <div className={classes.SHomepage}>
      <section className={classes.Section}>
        <MainPresentation />
      </section>

      <section ref={refs[0]} className={classes.Section}>
        <div
          className={classes.Wrapper}
          style={{ opacity: visibleSectionNumber >= 1 ? 1 : 0 }}
        >
          {visibleSectionNumber >= 1 && (
            <div className={classes.Container}>
              <TextRender textToParse={mainText} />
            </div>
          )}
          <br />
        </div>
      </section>

      <section ref={refs[1]} className={classes.Section}>
        <div
          className={classes.Wrapper}
          style={{ opacity: visibleSectionNumber >= 2 ? 1 : 0 }}
        >
          {visibleSectionNumber >= 2 && (
            <div className={classes.Container}>
              <div className={classes.WorksSample}>
                <h3>Наши работы.</h3>
                <SimpleImageSlider photos={photos} />
                <button>Посмотреть портфолио.</button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section ref={refs[2]} className={classes.Section}>
        <div
          className={classes.Wrapper}
          style={{ opacity: visibleSectionNumber >= 3 ? 1 : 0 }}
        >
          {visibleSectionNumber >= 3 && (
            <div className={classes.Container}>
              <div className={classes.Clients}>
                <ListSvg
                  title={"Наши клиенты"}
                  items={clients}
                  typeSvg={"CLIENTS"}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
