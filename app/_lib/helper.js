import jsPDF from "jspdf";
import { toWords } from "number-to-words";
// import { getCabin, getGuest } from "./data-service";
// import { auth } from "./auth";

/**
 *
 * @param {number} value -value to be formatted
 * @returns {number}
 */

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

/**
 *
 * @param {{cabins:{name:string},guests:{nationalID: string},totalPrice: number}} booking -an object containing reservation data
 * @param {{name:string,email:string}} user - an object containing guest information
 * @param {string} currency - currency name
 * @param {string} unit  - currency denominator
 * @returns {string}  - dataurlstring
 */
export async function getInvoice(
  booking,
  user,
  currency = "naira",
  unit = "kobo"
) {
  const name = booking.cabins.name;
  const fullName = user.name;
  const email = user.email;
  const nationalID = booking.guests.nationalID;
  const amount = booking.totalPrice;

  function amountInWords() {
    const [whole, dec] = String(Number(amount.toFixed(2))).split(".");

    const w = toWords(Number(whole));
    let d = Number(dec) > 0 ? `${toWords(Number(dec))} ${unit}` : "";
    const convered = `${w} ${currency} ${d} only`;
    return convered;
  }

  // const img = new Image();
  // img.src = "/logo.png";

  const pdf = new jsPDF("p", "pt", [600, 600]);
  pdf.setFontSize(24);
  pdf.setFillColor("#6366f1");
  pdf.rect(10, 80, 570, 60, "F");
  // pdf.addImage(img, "PNG", 450, 10, 70, 70);
  // pdf.text(`Invoice `, 40, 60);
  pdf.setFontSize(34);
  pdf.text(`Booking #${booking.id} `, 40, 60);
  pdf.setTextColor("#ffffff");
  pdf.setFontSize(18);
  pdf.text(`${booking.numNights} Nights`, 40, 120);
  pdf.text(`In Cabin:  ${name}`, 125, 120);
  pdf.text(`${new Date(booking.startDate).toDateString()} -`, 275, 120);
  pdf.text(`${new Date(booking.endDate).toDateString()}`, 430, 120);
  pdf.setTextColor("#000000");
  pdf.setFontSize(12);
  pdf.text(
    `${fullName} +(${Number(booking.numGuests) - 1} guest(s)) `,
    40,
    170
  );

  pdf.text(`. ${email}`, 265, 170);
  pdf.text(`. National ID: ${nationalID}`, 440, 170);

  pdf.text(
    `Breakfast included?  ${booking.hasBreakfast ? "Yes" : "No"}`,
    40,
    195
  );
  pdf.text(`Observations:  ${booking.observations}`, 40, 216);

  pdf.setFontSize(24);
  pdf.setFont("", "italic", 700);
  pdf.text("Cost", 40, 255);
  pdf.line(40, 260, 520, 260);
  pdf.setFillColor("#dcfce7");
  pdf.rect(35, 260, 490, 70, "F");
  pdf.setFontSize(12);
  pdf.text(`Cabin price:  ${formatCurrency(booking.cabinPrice)}`, 50, 280);
  pdf.text(
    `Breakfast Price:  ${formatCurrency(booking.extrasPrice || 0.0)}`,
    50,
    300
  );
  pdf.setFontSize(24);

  pdf.text(`  ${booking.isPaid ? "PAID" : "NOT PAID YET"}`, 340, 300);
  pdf.setFontSize(12);
  pdf.text(`Extras:  ${formatCurrency(0)}`, 50, 320);
  pdf.line(40, 330, 520, 330);
  pdf.setFontSize(16);

  pdf.text(`Total price: ${formatCurrency(booking.totalPrice)}`, 40, 350);
  pdf.text(`Amount in words: `, 40, 365);
  pdf.setFontSize(12);
  pdf.text(`${amountInWords(booking.totalPrice, "naira", "kobo")}`, 180, 365);
  pdf.setFontSize(10);
  pdf.text(`booked  ${new Date(booking.created_at).toUTCString()}`, 350, 390);
  pdf.setFontSize(16);
  pdf.setFillColor("#15803d");
  pdf.rect(315, 30, 100, 40, "F");
  pdf.link(10, 400, 500, 20, { url: "https://jensglobalmart.com" });
  pdf.setTextColor("#ffffff");
  pdf.text(`${booking.status}`, 320, 55);

  pdf.save(`${Date.now()}-${booking.id}.pdf`);
  return pdf.output("dataurlstring", {
    filename: `${Date.now()}-${booking.id}.pdf`,
  });
}
