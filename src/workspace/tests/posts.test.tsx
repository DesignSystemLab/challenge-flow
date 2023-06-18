import { render } from '@testing-library/react';
import { Posts } from '../components/Posts';

describe('POST', () => {
  it('test', () => {
    render(<Posts />);
    expect(1).toBe(1);
  });
});
