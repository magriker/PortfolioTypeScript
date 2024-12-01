import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Memo } from "./Memo";

type CalenderProp = {
  memoItems: Memo;
  handleCreatButtonClick: () => void;
  setTargetDate: (targetDate: string) => void;
  handleOpen: (targetItem: Memo) => void;
};

const Calender = ({
  memoItems,
  handleCreatButtonClick,
  setTargetDate,
  handleOpen,
}: CalenderProp) => {
  const handleDateClick = (arg: object) => {
    handleCreatButtonClick();
    setTargetDate(arg.dateStr);
    console.log(arg.dateStr);
  };

  const handleEventClick = (arg: object) => {
    console.log(arg.event);

    const targetItem: Memo = memoItems.find(
      (item: Memo) => item.id === arg.event.id
    );
    console.log(targetItem);

    handleOpen(targetItem);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={memoItems}
      dateClick={handleDateClick}
      locale="ja"
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "dayGridMonth,dayGridWeek,dayGridDay",
      }}
      eventClick={handleEventClick}
    ></FullCalendar>
  );
};

export default Calender;
