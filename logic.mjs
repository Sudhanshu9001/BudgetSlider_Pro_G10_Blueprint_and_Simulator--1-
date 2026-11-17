/** Pure, dependency-free budget calculations used by the UI and automated tests. */
export const DEMO_SERVICES = Object.freeze({ EC2:31.2, S3:10, Lambda:8.8, DynamoDB:22 });
export const SCENARIOS = Object.freeze({
  standard:{EC2:31.2,S3:10,Lambda:8.8,DynamoDB:22},
  lean:{EC2:14,S3:6,Lambda:4,DynamoDB:9},
  warning:{EC2:37,S3:12,Lambda:10,DynamoDB:26},
  exceeded:{EC2:52,S3:15,Lambda:15,DynamoDB:38}
});
export function clampNumber(value,min,max) {
  const n = Number(value);
  if (!Number.isFinite(n)) return min;
  return Math.max(min,Math.min(max,n));
}
export function totalCost(services) {
  return Math.round(Object.values(services).reduce((sum,v) => sum + (Number(v)||0),0)*100)/100;
}
export function utilization(budget,cost) {
  if (!Number.isFinite(budget) || budget<=0) return 0;
  return cost / budget * 100;
}
export function budgetStatus(budget,cost,warningPercent=80) {
  if (!Number.isFinite(budget)||budget<=0||!Number.isFinite(cost)||cost<0) return {key:'invalid',label:'INVALID INPUT',led:'off',color:'muted'};
  const pct=utilization(budget,cost);
  if(pct>100) return {key:'exceeded',label:'OVER BUDGET',led:'rapid flash',color:'danger'};
  if(pct===100) return {key:'limit',label:'LIMIT REACHED',led:'rapid flash',color:'danger'};
  if(pct>=warningPercent) return {key:'warning',label:'WARNING',led:'slow flash',color:'warning'};
  return {key:'safe',label:'BUDGET SAFE',led:'off',color:'safe'};
}
export function projectedCost(cost,daysElapsed=16,daysInMonth=30){
  if(daysElapsed<=0||daysInMonth<=0) return 0;
  return Math.round((cost/daysElapsed*daysInMonth)*100)/100;
}
export function money(amount,currency='USD') {
  const rate = currency==='INR' ? 84 : 1; // deliberately fixed demo exchange factor, NOT a live rate
  return new Intl.NumberFormat('en-IN',{style:'currency',currency,maximumFractionDigits:2}).format(amount*rate);
}
export function syntheticHistory(total,days=30){
  return Array.from({length:days},(_,i)=>Math.max(0,Math.round((total*(i+1)/days + Math.sin(i*.75)*total*.035)*100)/100));
}
