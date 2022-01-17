import React from "react";
import "./Modal.scss";
import Category from "./Category";

const VacaturLawsKeyModal = (props) => {
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
            <p className="modalActive">Vacatur Laws Key</p>
            <Category name="Excellent" className="goodCategory">
              These states provide robust avenues for civil relief that are
              trauma-informed and allow survivors of trafficking to live free of
              documentation that records them as criminals rather than survivors
            </Category>
            <Category name="Good" className="fairCategory">
              These states have multiple avenues for civil relief for victims
              that are as trauma-informed as possible and allow for relief from
              multiple types of crimes. It should be noted that no state
              receives a score of Excellent. This is because no states make
              exceptions for acts of self-defense committed while being
              trafficked. If a victim physically fights back against their
              trafficker or their rapists (men buying them) then their assault
              or murder is not justified. If a victim cannot legally fight back
              to be free - how can they believe they have the right to be free?
            </Category>
            <Category name="Fair" className="weakCategory">
              These states have multiple avenues avenues for civil relief OR
              relief from multiple types of crimes. Combining these so that
              victims can choose how they can seek relief without undergoing
              intense trauma and needless legal obstacles and can seek relief
              from multiple types of crimes that victims are forced to commit in
              trafficking situations would improve these states' standing.
            </Category>
            <Category name="Needs Improvement" className="badCategory">
              These states have some level of civil remedy but the practice is
              cumbersome or provides narrow avenues for victim relief.
            </Category>
            <Category name="Bad" className="veryBadCategory">
              These states allow for some civil relief but the way that the
              relief is framed is often victim-blaming - for instance, requiring
              that victims show clear proof beyond a shadow of a doubt that they
              were trafficked AND that their charges for things like
              prostitution, truancy, petty theft (e.g. stealing food to eat)
              must be proven to be linked to trafficking. In some cases victims
              must prove the ways that their traffickers controlled them -
              painful and traumatic experiences when all a victim wants is to be
              able to rebuild their lives
            </Category>
            <Category name="Very Bad" className="noneCategory">
              These states have almost no civil relief for those charged and/or
              convicted of crimes that they committed while in their trafficking
              situation. In this case the law prosecutes the victim and causes
              them to be legally haunted by their past, in addition to the
              psychological, and sometimes physical, scars they must carry.
            </Category>
            <Category
              name="Kansas"
              className="kansasCategory
            "
            >
              Kansas only allows victims that have feared, and can prove they
              faced, physical violence to force them into prostitution to have
              those charges expunged. This ignores those coerced or defrauded
              and controlled through a variety of means that do not include
              physical violence. It also ignores actions victims are forced to
              engage in to survive their traffickers including petty theft (to
              eat or to make a quota demanded by their trafficker), truancy,
              assault, drug possession (for those kept controlled by their
              traffickers through narcotics), and more
            </Category>
          </div>
        </div>
      )}
    </>
  );
};

export default VacaturLawsKeyModal;
