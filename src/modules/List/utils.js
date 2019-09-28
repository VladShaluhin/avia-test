export const convertTime = n => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return {
    h: rhours,
    m: rminutes
  };
};

export const getEndTime = (time, duration) => {
  const origin = new Date(time).getTime();
  const minutes = Math.floor((origin / (1000 * 60)) % 60);
  const end = (minutes + duration) * 60000;

  return {
    h: new Date(end).getHours(),
    m: new Date(end).getMinutes()
  };
};
