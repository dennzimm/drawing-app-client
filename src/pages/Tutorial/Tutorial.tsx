import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSlide,
  IonSlides,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  arrowBackOutline,
  arrowForward,
  arrowForwardOutline,
} from "ionicons/icons";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
  ColorButton,
  DeleteButton,
  RedoButton,
  SizeSelectButton,
  ToolSelectButton,
  UndoButton,
} from "../../components";
import {
  serverStatusColors,
  serverStatusIcons,
  StyledServerStatusBadge,
} from "../../components/ServerStatus";
import { useStoreActions } from "../../store/hooks";
import "./Tutorial.scss";

const BodyText = styled.p`
  margin-left: auto;
  margin-right: auto;
  max-width: 45rem;
  font-size: 1rem !important;
`;

const PresentationWrapper = styled.div`
  pointer-events: none !important;
  position: relative;
`;

const Tutorial: React.FC = () => {
  const history = useHistory();

  const setMenuEnabled = useStoreActions(
    (actions) => actions.app.setMenuEnabled
  );
  const setHasSeenTutorial = useStoreActions(
    (actions) => actions.user.setHasSeenTutorial
  );

  const [showSkip, setShowSkip] = useState(true);
  const slideRef = useRef<HTMLIonSlidesElement>(null);

  useIonViewWillEnter(() => {
    setMenuEnabled(false);
  });

  const startApp = async () => {
    await setHasSeenTutorial(true);
    await setMenuEnabled(true);
    history.push("/drawings", { direction: "none" });
  };

  const handleSlideChangeStart = () => {
    slideRef.current!.isEnd().then((isEnd) => setShowSkip(!isEnd));
  };

  const slideNext = () => {
    slideRef.current!.slideNext();
  };

  const slidePrev = () => {
    slideRef.current!.slidePrev();
  };

  const Controls = () => (
    <div className="controls">
      <IonButtons slot="start">
        <IonButton color="primary" onClick={slidePrev}>
          <IonIcon slot="start" icon={arrowBackOutline} /> zurück
        </IonButton>

        <IonButton color="primary" onClick={slideNext}>
          weiter <IonIcon slot="end" icon={arrowForwardOutline} />
        </IonButton>
      </IonButtons>
    </div>
  );

  return (
    <IonPage id="tutorial-page">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="end">
            {showSkip && (
              <IonButton color="primary" onClick={startApp}>
                Überspringen
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSlides
          ref={slideRef}
          onIonSlideWillChange={handleSlideChangeStart}
          pager={true}
        >
          <IonSlide>
            <img
              src="assets/img/monster_artist.svg"
              alt=""
              className="slide-image"
            />
            <h2 className="slide-title">
              <b>Hallo!</b> Lass uns doch gemeinsam etwas malen{" "}
              <span role="img" aria-label="">
                🤩
              </span>
            </h2>

            <BodyText>
              In diesem kurzen Tutorial zeige ich dir, wie du{" "}
              <b>gemeinsam mit deinen Freunden</b> (oder auch alleine) deiner
              Kreativität freien Lauf lassen kannst.
            </BodyText>

            <IonButton
              className="body-text-spacing"
              fill="clear"
              onClick={slideNext}
            >
              Lass uns beginnen! <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </IonSlide>

          <IonSlide>
            <img
              src="assets/img/creativity.svg"
              alt=""
              className="slide-image"
            />
            <h2 className="slide-title">Wo kann ich zeichnen?</h2>

            <BodyText>
              Nach diesem Tutorial wirst du zur Startseite weitergeleitet, wo du
              entscheiden kannst, ob du eine <b>neue Zeichnung erstellen</b>{" "}
              möchtest, oder{" "}
              <b>
                mithilfe einer ID deinem Freund bei seinem Meisterwerk helfen
                möchtest
              </b>{" "}
              <span role="img" aria-label="">
                👩‍🎨👨‍🎨
              </span>
            </BodyText>

            <BodyText className="body-text-spacing">
              Natürlich kannst du auch über den Menüpunkt &raquo;Zeichnen&laquo;
              diese Seite erreichen
            </BodyText>

            <Controls />
          </IonSlide>

          <IonSlide>
            <div className="image-title-grid">
              <img
                src="assets/img/refreshing_beverage.svg"
                alt=""
                className="slide-image slide-image--small"
              />

              <div>
                <h2 className="slide-title">Welche Funtionen gibt es?</h2>
                <BodyText>
                  Schön, dass du fragst!{" "}
                  <span role="img" aria-label="">
                    😇
                  </span>
                </BodyText>
              </div>
            </div>

            <div className="presentation-grid">
              <div className="presentation-grid__item">
                <BodyText>
                  <b>Strichstärke auswählen</b>
                </BodyText>

                <PresentationWrapper>
                  <SizeSelectButton />
                </PresentationWrapper>
              </div>

              <div className="presentation-grid__item">
                <PresentationWrapper>
                  <ColorButton />
                </PresentationWrapper>

                <BodyText>
                  <b>Farbe wechseln</b>
                </BodyText>
              </div>

              <div className="presentation-grid__item">
                <BodyText>
                  <b>Radierer, Pinsel und Stift</b>
                </BodyText>

                <div className="">
                  <PresentationWrapper className="presentation-grid__item-wrapper">
                    <ToolSelectButton className="presentation-fab" />
                  </PresentationWrapper>

                  <PresentationWrapper className="presentation-grid__item-wrapper">
                    <ToolSelectButton
                      className="presentation-fab"
                      activated={true}
                    />
                  </PresentationWrapper>
                </div>
              </div>

              <div className="presentation-grid__item">
                <div className="presentation-actions">
                  <PresentationWrapper>
                    <UndoButton />
                  </PresentationWrapper>

                  <PresentationWrapper>
                    <RedoButton />
                  </PresentationWrapper>

                  <PresentationWrapper>
                    <DeleteButton />
                  </PresentationWrapper>
                </div>

                <BodyText>
                  <b>Rückgängig machen, wiederholen und löschen</b>
                </BodyText>
              </div>
            </div>

            <Controls />
          </IonSlide>

          <IonSlide>
            <img
              src="assets/img/tree_swing.svg"
              alt=""
              className="slide-image slide-image--medium"
            />
            <h2 className="slide-title">
              Sonst noch was?{" "}
              <span role="img" aria-label="">
                🤓
              </span>
            </h2>

            <BodyText>
              Ja! Wenn du zeichnest, siehst du oben rechts in der Ecke, ob du
              mit dem Server verbunden bist.{" "}
            </BodyText>

            <BodyText className="body-text-spacing">
              Dieses Icon{" "}
              <StyledServerStatusBadge color={serverStatusColors.ready}>
                <IonIcon icon={serverStatusIcons.ready} size="small" />
              </StyledServerStatusBadge>{" "}
              zeigt dir, dass alles ok ist und du{" "}
              <b>mit dem Server verbunden</b> bist. Jetzt kannst du nicht nur{" "}
              <b>in Echtzeit mit deinen Freunden malen</b>, sondern deine
              Zeichnung wird auch gespeichert! <b>Wie cool ist das denn?!</b>{" "}
              <span role="img" aria-label="">
                😲
              </span>
            </BodyText>

            <BodyText className="body-text-spacing">
              Und siehst du einmal dieses Icon{" "}
              <StyledServerStatusBadge color={serverStatusColors.error}>
                <IonIcon icon={serverStatusIcons.error} size="small" />
              </StyledServerStatusBadge>
              , dann musst du <b>nicht gleich in Panik verfallen</b>{" "}
              <span role="img" aria-label="">
                😱
              </span>
              . Du bist zwar nicht mit dem Server verbunden,{" "}
              <b>kannst aber weiter zeichnen!</b> Ist die Verbindung wieder
              aufgebaut (das passiert automatisch), wird deine{" "}
              <b>Zeichnung synchronisiert</b> und du und deine Freunde seid
              wieder <b>auf dem gleichen Stand</b>.
            </BodyText>

            <Controls />
          </IonSlide>

          <IonSlide>
            <img
              src="assets/img/product_teardown.svg"
              alt=""
              className="slide-image"
            />
            <h2 className="slide-title">Ach ja,..</h2>

            <BodyText>
              Manche Bereiche sind noch nicht ganz fertig{" "}
              <span role="img" aria-label="">
                👨‍💻
              </span>
              ,... aber ich denke du hast Verständnis dafür, denn eine App
              programmiert sich nicht von alleine und benötigt Zeit{" "}
              <span role="img" aria-label="">
                😌
              </span>
            </BodyText>

            <BodyText className="body-text-spacing">Und jetzt...</BodyText>

            <Controls />
          </IonSlide>

          <IonSlide>
            <img
              src="assets/img/shy_monsters.svg"
              alt=""
              className="slide-image"
            />

            <h2 className="slide-title">
              Viel spaß beim Malen!{" "}
              <span role="img" aria-label="">
                🥳
              </span>
            </h2>

            <IonButton
              className="body-text-spacing"
              fill="clear"
              onClick={startApp}
            >
              Los geht's <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Tutorial;
