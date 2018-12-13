using System.Threading.Tasks;

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