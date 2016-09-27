/* eslint-disable max-nested-callbacks */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const expect = chai.expect;
chai.use(chaiAsPromised);

it('should have a test', () => {
	return expect(Promise.resolve('foo')).to.eventually.equal('foo');
});
