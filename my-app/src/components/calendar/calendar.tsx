import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.scss";

interface AvailabilityCalendarProps {
    bookedDates: Date[];
    selectedRange?: [Date | null, Date | null];
    onChange?: (value: [Date, Date]) => void;
    mode?: "view" | "booking";
}

/**
 * AvailabilityCalendar component
 *
 * Displays a calendar highlighting booked dates and (optionally) allows users to select a date range.
 * - In "view" mode: shows booked dates only.
 * - In "booking" mode: enables range selection and disables booked dates.
 */
const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
    bookedDates,
    selectedRange = [null, null],
    onChange,
    mode = "view",
}) => {
    return (
        <div className="availability-calendar">
            <Calendar
                selectRange={mode === "booking"}
                value={mode === "booking" ? selectedRange : undefined}
                onChange={(val) => {
                    if (mode === "booking" && Array.isArray(val) && onChange) {
                        onChange(val as [Date, Date]);
                    }
                }}
                tileClassName={({ date }) =>
                    bookedDates.some(
                        (d) => d.toDateString() === date.toDateString()
                    )
                        ? "booked-date"
                        : undefined
                }
                tileDisabled={({ date }) =>
                    mode === "booking" &&
                    bookedDates.some(
                        (d) => d.toDateString() === date.toDateString()
                    )
                }
            />
        </div>
    );
};

export default AvailabilityCalendar;
