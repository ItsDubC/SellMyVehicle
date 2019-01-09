using System.IO;
using System.Linq;

namespace SellMyVehicle.Core.Models
{
    public class PhotoSettings
    {
        public int MaxBytes { get; set; }
        public string[] AcceptedFileTypes { get; set; }

        public bool isFileSupported(string fileName)
        {
            return AcceptedFileTypes.Any(s => s == Path.GetExtension(fileName).ToLower());
        }
    }
}