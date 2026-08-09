export const getProjectFilterHref = (category: string) => {
  if (category === 'All') {
    return '/projects';
  }

  const params = new URLSearchParams({ category });
  return `/projects?${params.toString()}`;
};

export const getProjectPageHref = (category: string, page: number) => {
  const params = new URLSearchParams();
  if (category !== 'All') params.set('category', category);
  if (page > 1) params.set('page', String(page));
  const qs = params.toString();
  return qs ? `/projects?${qs}` : '/projects';
};
