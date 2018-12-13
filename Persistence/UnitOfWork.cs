using System.Threading.Tasks;
using SellMyVehicle.Core;

namespace SellMyVehicle.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SellMyVehicleDbContext context;

        public UnitOfWork(SellMyVehicleDbContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}