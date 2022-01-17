import React from "react";
import "./Modal.scss";
import Category from "./Category";

const MassageLawsKeyModal = (props) => {
  const { closeModal, modalVisible } = props;

  const onClose = (e) => {
    e.stopPropagation();
    closeModal();
  };

  return (
    <>
      {modalVisible && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <p className="modalActive">Massage Parlor Laws Key</p>
            <Category name="Good" className="goodCategory">
              This law contains at least 3 of the clauses that have proven
              successful at closing trafficking venues while placing minimum
              burdens on licensed practitioners
            </Category>
            <Category name="Fair" className="fairCategory">
              The jurisdiction has passed a law that attempts to regulate
              businesses to close exploitative and/or trafficking sites but
              lacks sufficient clauses to reliably close such venues
            </Category>
            <Category name="Weak" className="weakCategory">
              The law has minimal clauses to regulate businesses - usually just
              zoning restrictions or requirements to obtain a business license
            </Category>
            <Category name="Bad" className="badCategory">
              The law targets the behavior of workers and targets the
              consequences to the workers as well, placing all of the burden on
              potential trafficking victims rather than the managers and
              operatives controlling their behavior
            </Category>
            <Category name="Very Bad" className="veryBadCategory">
              These laws frequently categorize all massage businesses as
              sexually-oriented. Not only does this make it exponentially harder
              to help potential trafficking victims, it puts licensed
              practitioners at higher risk of sexual harrassment and assault
              because their therapeutic practices are labeled the same as strip
              clubs and pornographic video stores.
            </Category>
            <Category name="None" className="noneCategory">
              There are no laws governing massage establishments. In the case of
              counties of cities they can sometimes draw on state laws but
              experience has proven that local inspectors and civil enforcement
              equipped with local laws can bring consequences to traffickers
              that just relying on state laws cannot.
            </Category>
          </div>
        </div>
      )}
    </>
  );
};

export default MassageLawsKeyModal;
