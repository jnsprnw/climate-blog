/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Authors = "authors",
	Entries = "entries",
	Formats = "formats",
	Languages = "languages",
	Locations = "locations",
	Posts = "posts",
	Publishers = "publishers",
	References = "references",
	Schemas = "schemas",
	Topics = "topics",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type AuthorsRecord = {
	created?: IsoDateString
	id: string
	name?: string
	updated?: IsoDateString
}

export type EntriesRecord<Tslug = unknown> = {
	created?: IsoDateString
	id: string
	schemas?: RecordIdString
	slug?: null | Tslug
	title?: string
	updated?: IsoDateString
}

export type FormatsRecord = {
	created?: IsoDateString
	id: string
	label?: string
	updated?: IsoDateString
}

export type LanguagesRecord = {
	created?: IsoDateString
	id: string
	key?: string
	label?: string
	updated?: IsoDateString
}

export type LocationsRecord = {
	created?: IsoDateString
	id: string
	label?: string
	updated?: IsoDateString
}

export type PostsRecord = {
	authors?: RecordIdString[]
	connection?: RecordIdString[]
	content?: HTMLString
	created?: IsoDateString
	date?: IsoDateString
	description?: string
	formats?: RecordIdString[]
	id: string
	image?: string
	image_alt?: string
	image_caption?: string
	image_source_label?: string
	image_source_url?: string
	isFavorite?: boolean
	language?: RecordIdString
	locations?: RecordIdString[]
	published?: IsoDateString
	publisher?: RecordIdString
	quote?: string
	quote_author?: string
	reference?: RecordIdString
	reference_link?: string
	schemas?: RecordIdString
	slug?: string
	tags?: RecordIdString[]
	title?: string
	title_short?: string
	updated?: IsoDateString
	url?: string
	video?: string
	video_caption?: string
}

export type PublishersRecord = {
	created?: IsoDateString
	id: string
	label?: string
	updated?: IsoDateString
}

export type ReferencesRecord = {
	created?: IsoDateString
	id: string
	label?: string
	updated?: IsoDateString
}

export type SchemasRecord = {
	created?: IsoDateString
	id: string
	key?: string
	label?: string
	updated?: IsoDateString
}

export type TopicsRecord = {
	created?: IsoDateString
	id: string
	label?: string
	updated?: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	email?: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	username: string
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type AuthorsResponse<Texpand = unknown> = Required<AuthorsRecord> & BaseSystemFields<Texpand>
export type EntriesResponse<Tslug = unknown, Texpand = unknown> = Required<EntriesRecord<Tslug>> & BaseSystemFields<Texpand>
export type FormatsResponse<Texpand = unknown> = Required<FormatsRecord> & BaseSystemFields<Texpand>
export type LanguagesResponse<Texpand = unknown> = Required<LanguagesRecord> & BaseSystemFields<Texpand>
export type LocationsResponse<Texpand = unknown> = Required<LocationsRecord> & BaseSystemFields<Texpand>
export type PostsResponse<Texpand = unknown> = Required<PostsRecord> & BaseSystemFields<Texpand>
export type PublishersResponse<Texpand = unknown> = Required<PublishersRecord> & BaseSystemFields<Texpand>
export type ReferencesResponse<Texpand = unknown> = Required<ReferencesRecord> & BaseSystemFields<Texpand>
export type SchemasResponse<Texpand = unknown> = Required<SchemasRecord> & BaseSystemFields<Texpand>
export type TopicsResponse<Texpand = unknown> = Required<TopicsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	authors: AuthorsRecord
	entries: EntriesRecord
	formats: FormatsRecord
	languages: LanguagesRecord
	locations: LocationsRecord
	posts: PostsRecord
	publishers: PublishersRecord
	references: ReferencesRecord
	schemas: SchemasRecord
	topics: TopicsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	authors: AuthorsResponse
	entries: EntriesResponse
	formats: FormatsResponse
	languages: LanguagesResponse
	locations: LocationsResponse
	posts: PostsResponse
	publishers: PublishersResponse
	references: ReferencesResponse
	schemas: SchemasResponse
	topics: TopicsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'authors'): RecordService<AuthorsResponse>
	collection(idOrName: 'entries'): RecordService<EntriesResponse>
	collection(idOrName: 'formats'): RecordService<FormatsResponse>
	collection(idOrName: 'languages'): RecordService<LanguagesResponse>
	collection(idOrName: 'locations'): RecordService<LocationsResponse>
	collection(idOrName: 'posts'): RecordService<PostsResponse>
	collection(idOrName: 'publishers'): RecordService<PublishersResponse>
	collection(idOrName: 'references'): RecordService<ReferencesResponse>
	collection(idOrName: 'schemas'): RecordService<SchemasResponse>
	collection(idOrName: 'topics'): RecordService<TopicsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
