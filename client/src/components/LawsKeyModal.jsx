import React, { useState, useCallback } from "react";
import "../styles/UploadModal.css";

const modalActiveClass = "pt-4 px-2 text-xl inline font-bold";
const categoryHeader =
  "pt-2 px-2 text-base inline-block font-bold align-middle";
const categoryDescription = "pt-1 px-2 text-sm inline";

const LawsKeyModal = (props) => {
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
            <div class="flex">
              <p class={modalActiveClass}>Massage Parlor Laws Key</p>
            </div>
            <div class="flex">
              <div class={categoryHeader}>
                <div className="square goodCategory"></div>Good
              </div>
            </div>
            <div class="flex">
              <p class={categoryDescription}>
                This law contains at least 3 of the clauses that have proven
                successful at closing trafficking venues while placing minimum
                burdens on licensed practitioners
              </p>
            </div>
            <div class="flex">
              <div class={categoryHeader}>
                <div className="square fairCategory"></div>Fair
              </div>
            </div>
            <div class="flex">
              <p class={categoryDescription}>
                The jurisdiction has passed a law that attempts to regulate
                businesses to close exploitative and/or trafficking sites but
                lacks sufficient clauses to reliably close such venues
              </p>
            </div>
            <div class="flex">
              <div class={categoryHeader}>
                <div className="square weakCategory"></div>Weak
              </div>
            </div>
            <div class="flex">
              <p class={categoryDescription}>
                The law has minimal clauses to regulate businesses - usually
                just zoning restrictions or requirements to obtain a business
                license
              </p>
            </div>
            <div class="flex">
              <div class={categoryHeader}>
                <div className="square badCategory"></div>Bad
              </div>
            </div>
            <div class="flex">
              <p class={categoryDescription}>
                The law targets the behavior of workers and targets the
                consequences to the workers as well, placing all of the burden
                on potential trafficking victims rather than the managers and
                operatives controlling their behavior
              </p>
            </div>
            <div class="flex">
              <div class={categoryHeader}>
                <div className="square veryBadCategory"></div>Very Bad
              </div>
            </div>
            <div class="flex">
              <p class={categoryDescription}>
                These laws frequently categorize all massage businesses as
                sexually-oriented. Not only does this make it exponentially
                harder to help potential trafficking victims, it puts licensed
                practitioners at higher risk of sexual harrassment and assault
                because their therapeutic practices are labeled the same as
                strip clubs and pornographic video stores.
              </p>
            </div>
            <div class="flex">
              <div class={categoryHeader}>
                <div className="square noneCategory"></div>None
              </div>
            </div>
            <div class="flex">
              <p class={categoryDescription}>
                There are no laws governing massage establishments. In the case
                of counties of cities they can sometimes draw on state laws but
                experience has proven that local inspectors and civil
                enforcement equipped with local laws can bring consequences to
                traffickers that just relying on state laws cannot.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LawsKeyModal;
