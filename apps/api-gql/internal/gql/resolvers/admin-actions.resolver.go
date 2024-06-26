package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.45

import (
	"context"
	"fmt"
)

// DropAllAuthSessions is the resolver for the dropAllAuthSessions field.
func (r *mutationResolver) DropAllAuthSessions(ctx context.Context) (bool, error) {
	keys, err := r.redis.Keys(ctx, "scs:*").Result()
	if err != nil {
		return false, fmt.Errorf("failed to get session keys: %w", err)
	}

	if len(keys) == 0 {
		return true, nil
	}

	err = r.redis.Del(ctx, keys...).Err()
	if err != nil {
		return false, fmt.Errorf("failed to delete sessions: %w", err)
	}

	return true, nil
}
