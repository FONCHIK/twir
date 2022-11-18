package stats

import (
	"sync"

	model "github.com/satont/tsuwari/libs/gomodels"

	"github.com/satont/tsuwari/apps/api/internal/types"
)

type nResult struct {
	N int64
}

type statsItem struct {
	Count int64  `json:"count"`
	Name  string `json:"name"`
}

func handleGet(services types.Services) ([]statsItem, error) {
	wg := sync.WaitGroup{}
	statistic := []statsItem{
		{Name: "users"},
		{Name: "channels"},
		{Name: "commands"},
		{Name: "messages"},
	}

	wg.Add(4)

	go func() {
		defer wg.Done()
		var count int64
		err := services.DB.Model(&model.Users{}).Count(&count).Error
		if err != nil {
			services.Logger.Sugar().Error(err)
		} else {
			statistic[0].Count = count
		}
	}()

	go func() {
		defer wg.Done()
		var count int64
		err := services.DB.Model(&model.Channels{}).Count(&count).Error
		if err != nil {
			services.Logger.Sugar().Error(err)
		} else {
			statistic[1].Count = count
		}
	}()

	go func() {
		defer wg.Done()
		var count int64
		err := services.DB.Model(&model.ChannelsCommands{}).Count(&count).Error
		if err != nil {
			services.Logger.Sugar().Error(err)
		} else {
			statistic[2].Count = count
		}
	}()

	go func() {
		defer wg.Done()
		result := nResult{}
		err := services.DB.Model(&model.UsersStats{}).
			Select("sum(messages) as n").
			Scan(&result).
			Error
		if err != nil {
			services.Logger.Sugar().Error(err)
		} else {
			statistic[3].Count = result.N
		}
	}()

	wg.Wait()

	return statistic, nil
}