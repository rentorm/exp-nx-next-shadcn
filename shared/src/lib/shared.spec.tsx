import { render } from '@testing-library/react';

import MyOrgShared from './shared';

describe('MyOrgShared', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MyOrgShared />);
    expect(baseElement).toBeTruthy();
  });
});
