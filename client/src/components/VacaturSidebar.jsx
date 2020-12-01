import React from "react";

const fakeVacatur = {
    state: 'Illinois',
    anyTypeCivilRemedy: true,
    offersVacatur: 'Juvenile Only',
    offersClemency: 'No',
    OffersExpungement: 'Yes',
    rank: 'Needs Improvement'
}

const rankColorMap = {
    'Kansas': '#7C2323',
    'Very Bad': '#CF2A2A',
    'Bad': '#EB5757',
    'Needs Improvement': '#FA9158',
    'Fair': '#FFCB21',
    'Good': '#6FCF97',
    'Excellent': '#257F4A'
}

type Props = {
    vacatur: Object
};

const VacaturSidebar = (props: Props) => {

    // const { vacatur } = props;
    const vacatur = fakeVacatur;

    return (
        <>
            <h3 class="txt-gray">Vacatur Rating</h3>
            <div class="flex">
                <div class="inline-block mt-1">
                    <box-icon type='solid' name='circle' color={rankColorMap[vacatur.rank]}/>
                </div>
                <h3 class="text-white inline-block ml-2 mt-1">{vacatur.rank} <a class="txt-blue">(Learn about other ratings)</a></h3>
            </div>
            <p class="txt-gray text-sm mb-4">
                The law has minimal clauses to regulate businesses - usually just zoning restrictions or requirements to obtain a business license
            </p>
            <div class="rounded bg-eclipse text-white p-2">
                <p class="float-left">Civil Remedy</p>
                <div class="float-right flex">
                    <p class="inline-block mr-2 txt-silver">Learn More</p>
                    <div class="inline-block mt-0.5">
                        <box-icon name='plus-circle' color="#C4C4C4"></box-icon>
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default VacaturSidebar