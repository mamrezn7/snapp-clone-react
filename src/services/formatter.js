function formatWithSeparator(num) {
  const formatter = new Intl.NumberFormat("fa-IR");
  const formattedNumber = formatter.format(num);
  return formattedNumber;
}

function toPersianNum(englishNum) {
  var persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return englishNum.toString().replace(/\d/g, function (x) {
    return persianDigits[x];
  });
}

export const formatterService = { formatWithSeparator, toPersianNum };
