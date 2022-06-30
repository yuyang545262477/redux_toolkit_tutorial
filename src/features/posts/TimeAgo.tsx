import {formatDistanceToNow, parseISO} from "date-fns";
import React from "react";

interface TimeAgoProps {
    timestamp: string;
}


const TimeAgo = ({timestamp}: TimeAgoProps) => {
    let timeAgo = "";
    if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date, {addSuffix: true});
        timeAgo = `${timePeriod}`;
    }
    return (
        <span title={timestamp}>
            &nbsp;{timeAgo}
        </span>
    );
};

export default TimeAgo;
