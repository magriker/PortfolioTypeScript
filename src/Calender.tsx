import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calender = ({
  memoItems,
  handleCreatButtonClick,
  setTargetDate,
  handleOpen,
}): any => {
  const handleDateClick = (arg: any) => {
    handleCreatButtonClick();
    setTargetDate(arg.dateStr);
    console.log(arg.dateStr);
  };

  const handleEventClick = (arg: any) => {
    const targetItem: any = memoItems.find(
      (item: any) => item.id === arg.event.id
    );
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
