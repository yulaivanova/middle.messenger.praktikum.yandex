type TimeDate = {
  day: string;
  time: string;
};

export function parseDate(str: string): TimeDate {
  const date = new Date(Date.parse(str));

  const day = date.toLocaleDateString('ru-RU');
  const time = date.toLocaleTimeString('ru-RU', { hour: "2-digit", minute: "2-digit" });

  const res : TimeDate = {
    day,
    time,
  };
  return res;
};
