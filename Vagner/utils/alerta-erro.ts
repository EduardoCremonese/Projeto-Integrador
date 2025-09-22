export async function alertaErro(err: any, titulo = 'Erro') {
  const msg = typeof err?.error === 'string' ? err.error : JSON.stringify(err?.error);
  const Swal = (await import('sweetalert2')).default;
  return Swal.fire(titulo, msg || 'Falha inesperada', 'error');
}
