package bus_listener

import (
	"context"

	"github.com/satont/twir/apps/eventsub/internal/manager"
	model "github.com/satont/twir/libs/gomodels"
	buscore "github.com/twirapp/twir/libs/bus-core"
	"github.com/twirapp/twir/libs/bus-core/eventsub"
	"go.uber.org/fx"
	"gorm.io/gorm"
)

type BusListener struct {
	eventSubClient *manager.Manager
	gorm           *gorm.DB
	bus            *buscore.Bus
}

type Opts struct {
	fx.In
	Lc fx.Lifecycle

	Manager *manager.Manager
	Gorm    *gorm.DB
	Bus     *buscore.Bus
}

func New(opts Opts) (*BusListener, error) {
	impl := &BusListener{
		eventSubClient: opts.Manager,
		gorm:           opts.Gorm,
		bus:            opts.Bus,
	}

	opts.Lc.Append(
		fx.Hook{
			OnStart: func(ctx context.Context) error {
				return impl.bus.EventSub.Subscribe.SubscribeGroup("eventsub", impl.subscribeToEvents)
			},
			OnStop: func(ctx context.Context) error {
				impl.bus.EventSub.Subscribe.Unsubscribe()
				return nil
			},
		},
	)

	return impl, nil
}

func (c *BusListener) subscribeToEvents(
	ctx context.Context,
	msg eventsub.EventsubSubscribeRequest,
) struct{} {
	channel := model.Channels{}
	err := c.gorm.
		WithContext(ctx).
		Where(
			`"id" = ?`,
			msg.ChannelID,
		).First(&channel).Error
	if err != nil {
		return struct{}{}
	}

	if err := c.eventSubClient.SubscribeToNeededEvents(
		ctx,
		msg.ChannelID,
		channel.BotID,
	); err != nil {
		return struct{}{}
	}

	return struct{}{}
}
