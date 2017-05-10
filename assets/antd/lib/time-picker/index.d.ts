/// <reference types="react" />
import React from 'react';
import moment from 'moment';
export interface TimePickerProps {
    className?: string;
    size?: 'large' | 'default' | 'small';
    value?: moment.Moment;
    defaultValue?: moment.Moment;
    format?: string;
    onChange?: (time: moment.Moment, timeString: string) => void;
    disabled?: boolean;
    placeholder?: string;
    hideDisabledOptions?: boolean;
    disabledHours?: () => number[];
    disabledMinutes?: (selectedHour: number) => number[];
    disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
    style?: React.CSSProperties;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    addon?: Function;
}
declare var _default: React.ComponentClass<TimePickerProps>;
export default _default;