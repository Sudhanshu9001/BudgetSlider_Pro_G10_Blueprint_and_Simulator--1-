import test from 'node:test';
import assert from 'node:assert/strict';
import {budgetStatus,totalCost,utilization,clampNumber,projectedCost,DEMO_SERVICES,SCENARIOS,money,syntheticHistory} from '../app/src/logic.mjs';

test('default example totals $72',()=>assert.equal(totalCost(DEMO_SERVICES),72));
test('presets have expected totals',()=>{
  assert.equal(totalCost(SCENARIOS.lean),33);
  assert.equal(totalCost(SCENARIOS.warning),85);
  assert.equal(totalCost(SCENARIOS.exceeded),120);
});
test('safe state below 80%',()=>{
  assert.equal(budgetStatus(100,60).key,'safe');
  assert.equal(budgetStatus(100,60).led,'off');
});
test('warning state at 85% flashes slowly',()=>{
  assert.equal(budgetStatus(100,85).key,'warning');
  assert.equal(budgetStatus(100,85).led,'slow flash');
});
test('exact limit state flashes rapidly',()=>{
  assert.equal(budgetStatus(100,100).key,'limit');
  assert.equal(budgetStatus(100,100).led,'rapid flash');
});
test('over budget state flashes rapidly',()=>{
  assert.equal(budgetStatus(100,125).key,'exceeded');
  assert.equal(budgetStatus(100,125).led,'rapid flash');
});
test('reject bad inputs',()=>{
  assert.equal(budgetStatus(0,72).key,'invalid');
  assert.equal(budgetStatus(-20,72).key,'invalid');
  assert.equal(budgetStatus(100,-1).key,'invalid');
});
test('custom threshold is honored',()=>{
  assert.equal(budgetStatus(100,70,70).key,'warning');
  assert.equal(budgetStatus(100,70,80).key,'safe');
});
test('utilization and value clamp',()=>{
  assert.equal(utilization(100,125),125);
  assert.equal(clampNumber('5000',10,1000),1000);
  assert.equal(clampNumber('not a number',10,1000),10);
});
test('transparent projection arithmetic',()=>assert.equal(projectedCost(80,16,30),150));
test('synthetic history is deterministic',()=>{
  assert.equal(syntheticHistory(72).length,30);
  assert.deepEqual(syntheticHistory(72),syntheticHistory(72));
});
test('currency output works in US dollars and sample INR',()=>{
  assert.match(money(100,'USD'),/100/);
  assert.match(money(100,'INR'),/8,400/);
});
