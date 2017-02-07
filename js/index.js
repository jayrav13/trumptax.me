// @flow

// An array of individual costs payed for by U.S. tax payers:
const baselineCosts: Array<number> = [
  // mar a logo vacation
  // http://www.politico.com/story/2017/02/trump-mar-lago-taxpayers-234562
  3000000,
  // Eric Trump's Uruguay trip
  // http://thehill.com/homenews/administration/317863-eric-trump-uruguay-trip-cost-taxpayers-98k-report
  98000
];

// All individual costs added to a single value:
const baseline: number = baselineCosts.reduce((accumulator, value, index) => {
  return accumulator + value;
}, 0);
console.log('baseline', baseline);

// Cost for security in NYC
// http://money.cnn.com/2016/11/21/news/protecting-donald-trump/
const nycCostPerYear: number = 1000000.00 * 365;
console.log('nycCostPerYear', nycCostPerYear);

const msPerYear: number = 31536000000;
console.log('msPerYear', msPerYear);

const nycCostPerMs: number = nycCostPerYear / msPerYear;
console.log('nycCostPerMs', nycCostPerMs);

const trumpStartDate: Date = new Date('Jan 20 2017 09:00:00 EST');
console.log('trumpStartDate', trumpStartDate);

const trumpStartMs: number = trumpStartDate.getTime();
console.log('trumpStartMs', trumpStartMs);

const valueAtBoot: number = calculate();
console.log('valueAtBoot', valueAtBoot);

const formattedValueAtBoot = format(valueAtBoot);
console.info('formattedValueAtBoot', formattedValueAtBoot);

const container: ?HTMLElement = document.querySelector('.dollars');

// Track alternate ways to spend this $.
const alternateOutlets = [
  // Number of students that can earn an associates degree.
  // http://www.huffingtonpost.com/2012/02/23/community-college-is-an-a_n_1297762.html
  {
    cost: 11852,
    caption: " students can earn an Associate's Degree."
  },
  // Number of homeless that can be housed in NYC's Section 8 housing.
  // https://www1.nyc.gov/site/nycha/section-8/voucher-payment-standards-vps-utility-allowance-schedule.page
  // https://twitter.com/sacca/status/828043541460852736
  {
    cost: 21216,
    caption: " homeless NYC families can pay for Section 8 housing for one year."
  }
];

function calculate(): number {
  const elapsedTime: number = Date.now() - trumpStartMs;
  return (elapsedTime * nycCostPerMs) + baseline;
}

function format(value: number): string {
  const formatted: string = value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  return formatted;
}

function renderAndQueue(): void {
  const value: string = format(calculate());

  if (container) {
    container.innerHTML = value;
  }

  window.requestAnimationFrame(renderAndQueue);
}

export default function main(): void {
  renderAndQueue();
}

main();
