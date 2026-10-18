import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
    it('memanggil onClick saat diklik', async () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Setuju</Button>);
        await userEvent.click(screen.getByRole('button', { name: 'Setuju' }));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('tidak bisa diklik saat disabled', async () => {
        const onClick = vi.fn();
        render(<Button disabled onClick={onClick}>Setuju</Button>);
        await userEvent.click(screen.getByRole('button'));
        expect(onClick).not.toHaveBeenCalled();
    });
});