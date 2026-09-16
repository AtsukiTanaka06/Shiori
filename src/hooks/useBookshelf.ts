import { useCallback, useEffect, useState } from 'react';

import { recordService } from '../services/recordService';
import { useAuthStore } from '../store/authStore';
import { useBookshelfStore } from '../store/bookshelfStore';
import type { BookWithRecord } from '../types';

export function useBookshelf() {
  const user = useAuthStore((s) => s.user);
  const { items, filter, displayMode, setItems, setFilter, setDisplayMode } =
    useBookshelfStore();
  const [isLoading, setIsLoading] = useState(false);

  const filteredItems: BookWithRecord[] =
    filter === 'all' ? items : items.filter((i) => i.record.status === filter);

  const load = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const data = await recordService.findByUserId(user.id);
      setItems(data);
    } finally {
      setIsLoading(false);
    }
  }, [user, setItems]);

  useEffect(() => {
    void load();
  }, [load]);

  return { items, filteredItems, filter, displayMode, isLoading, setFilter, setDisplayMode, refresh: load };
}
