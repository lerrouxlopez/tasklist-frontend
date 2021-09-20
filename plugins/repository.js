import ClientRepository from '~/api/client/client.repository'

export default (ctx, inject) => {
  inject('clientRepository', ClientRepository(ctx.$axios))
}
