import should from 'should';
import setup from '../../setup';
const data = require('./data');
const vsets = require('./valuesets');
const { p1 } = require('./patients');
import { Repository } from '../../../src/cql';

describe('Retrieve', () => {
  beforeEach(function () {
    setup(this, data, [p1], vsets, {}, new Repository(data));
  });

  it('should find conditions', async function () {
    const c = await this.conditions.exec(this.ctx);
    should(c).have.length(2);
    c[0].id.should.equal('http://cqframework.org/3/2');
    c[1].id.should.equal('http://cqframework.org/3/4');
    this.ctx.evaluatedRecords.should.have.length(2);
    this.ctx.evaluatedRecords.should.containDeep(c);
  });

  it('should find encounter performances', async function () {
    const e = await this.encounters.exec(this.ctx);
    should(e).have.length(3);
    e[0].id.should.equal('http://cqframework.org/3/1');
    e[1].id.should.equal('http://cqframework.org/3/3');
    e[2].id.should.equal('http://cqframework.org/3/5');
    this.ctx.evaluatedRecords.should.have.length(3);
    this.ctx.evaluatedRecords.should.containDeep(e);
  });

  it('should find observations with a value set from included library', async function () {
    const p = await this.pharyngitisConditions.exec(this.ctx);
    should(p).have.length(1);
    p[0].id.should.equal('http://cqframework.org/3/2');
    this.ctx.evaluatedRecords.should.have.length(1);
    this.ctx.evaluatedRecords.should.containDeep(p);
  });

  it('should find encounter performances with a value set', async function () {
    const a = await this.ambulatoryEncounters.exec(this.ctx);
    should(a).have.length(3);
    a[0].id.should.equal('http://cqframework.org/3/1');
    a[1].id.should.equal('http://cqframework.org/3/3');
    a[2].id.should.equal('http://cqframework.org/3/5');
    this.ctx.evaluatedRecords.should.have.length(3);
    this.ctx.evaluatedRecords.should.containDeep(a);
  });

  it('should find encounter performances by code', async function () {
    const e = await this.encountersByCode.exec(this.ctx);
    should(e).have.length(3);
    e[0].id.should.equal('http://cqframework.org/3/1');
    e[1].id.should.equal('http://cqframework.org/3/3');
    e[2].id.should.equal('http://cqframework.org/3/5');
    this.ctx.evaluatedRecords.should.have.length(3);
    this.ctx.evaluatedRecords.should.containDeep(e);
  });

  it('should not find conditions with wrong valueset', async function () {
    const e = await this.wrongValueSet.exec(this.ctx);
    should(e).be.empty();
    this.ctx.evaluatedRecords.should.be.empty;
  });

  it('should not find encounter performances using wrong codeProperty', async function () {
    const e = await this.wrongCodeProperty.exec(this.ctx);
    should(e).be.empty();
    this.ctx.evaluatedRecords.should.be.empty;
  });

  it('should find conditions by specific pharyngitis code', async function () {
    const e = await this.conditionsByCode.exec(this.ctx);
    should(e).have.length(1);
    e[0].id.should.equal('http://cqframework.org/3/2');
    this.ctx.evaluatedRecords.should.have.length(1);
    this.ctx.evaluatedRecords.should.containDeep(e);
  });

  it('should find conditions by specific pharyngitis concept', async function () {
    const e = await this.conditionsByConcept.exec(this.ctx);
    should(e).have.length(1);
    e[0].id.should.equal('http://cqframework.org/3/2');
    this.ctx.evaluatedRecords.should.have.length(1);
    this.ctx.evaluatedRecords.should.containDeep(e);
  });
});
