import React from 'react';
import Route from 'react-router/lib/Route';

import DummyComponent from './DummyComponent';

export default (
	<Route path="/">
		<Route path="foo" component={DummyComponent} />
		<Route path="bar" component={DummyComponent} />
	</Route>
);
