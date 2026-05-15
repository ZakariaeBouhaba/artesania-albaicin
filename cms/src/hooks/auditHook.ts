import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const afterChangeAudit: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
  collection,
}) => {
  try {
    await req.payload.create({
      collection: 'audit-logs',
      data: {
        action: operation === 'create' ? 'CREATE' : 'UPDATE',
        collection: collection.slug,
        documentId: String(doc.id),
        performedBy: req.user?.id ?? null,
        timestamp: new Date().toISOString(),
        snapshot: doc as Record<string, unknown>,
      },
    })
  } catch (err) {
    req.payload.logger.error({ err }, 'Audit log write failed')
  }
  return doc
}

export const afterDeleteAudit: CollectionAfterDeleteHook = async ({
  doc,
  req,
  collection,
}) => {
  try {
    await req.payload.create({
      collection: 'audit-logs',
      data: {
        action: 'DELETE',
        collection: collection.slug,
        documentId: String(doc.id),
        performedBy: req.user?.id ?? null,
        timestamp: new Date().toISOString(),
        snapshot: doc as Record<string, unknown>,
      },
    })
  } catch (err) {
    req.payload.logger.error({ err }, 'Audit log write failed')
  }
  return doc
}
