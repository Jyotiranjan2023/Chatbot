const defaultData = [
  {
    id: 1,
    question: "Hi 👋 How can I help you today?",
    options: [
      { text: "Deposit Issue", next: 2 },
      { text: "Withdrawal Issue", next: 3 },
      { text: "Bonus Issue", next: 4 },
      { text: "Technical Issue", next: 5 },
      { text: "Referral Issue", next: 6 },
      { text: "Other Support", next: 7 },
    ],
  },
  {
    id: 2,
    answer: "Deposit usually reflects within 5 minutes. If not, contact support.",
    options: [{ text: "Back", next: 1 }],
  },
  {
    id: 3,
    answer: "Withdrawals are processed within 24 hours.",
    options: [{ text: "Back", next: 1 }],
  },
  {
    id: 4,
    answer: "Bonus is credited automatically after deposit.",
    options: [{ text: "Back", next: 1 }],
  },
  {
    id: 5,
    answer: "Try clearing cache or reinstalling app.",
    options: [{ text: "Back", next: 1 }],
  },
  {
    id: 6,
    answer: "Referral bonus is credited when your friend completes signup.",
    options: [{ text: "Back", next: 1 }],
  },
  {
    id: 7,
    answer: "Please describe your issue below 👇",
    options: [],
  },
];