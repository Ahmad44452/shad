const InfoModal = ({ setInfoModalVisible }) => {
  return (
    <div className="info">
      <div className="info__content">
        <span className="info__exit" onClick={() => setInfoModalVisible(false)}>
          x
        </span>
        <p className="info__text">
          Shad is a web-based app that makes prediction using a trained Random
          Forest model. Enter the age and estimated salary of your target
          customers. The app will use an AI Model to predict if displaying ads
          on this site will make you profit or not.
        </p>
      </div>
    </div>
  );
};

export default InfoModal;
